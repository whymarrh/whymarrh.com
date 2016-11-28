variable "domain" {
  default = "whymarrh.com"
}

provider "aws" {
  region = "us-east-1"
}

data "aws_acm_certificate" "domain" {
  domain = "whymarrh.com"
}

resource "aws_s3_bucket" "domain" {
  bucket = "${var.domain}"
  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [{
    "Sid": "PublicReadForGetBucketObjects",
    "Effect": "Allow",
    "Principal": "*",
    "Action": "s3:GetObject",
    "Resource": "arn:aws:s3:::${var.domain}/*"
  }]
}
EOF

  logging {
    target_bucket = "logs.${var.domain}"
    target_prefix = "s3/"
  }

  website {
    index_document = "index.html"
    error_document = "404.html"
  }
}

resource "aws_s3_bucket" "s3_subdomain" {
  bucket = "s3.${var.domain}"
  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [{
    "Sid": "PublicReadForGetBucketObjects",
    "Effect": "Allow",
    "Principal": "*",
    "Action": "s3:GetObject",
    "Resource": "arn:aws:s3:::s3.${var.domain}/*"
  }]
}
EOF
}

resource "aws_cloudfront_distribution" "distribution" {
  origin {
    domain_name = "${aws_s3_bucket.domain.website_endpoint}"
    origin_id = "${var.domain}"

    custom_origin_config {
      http_port = 80
      https_port = 443
      origin_protocol_policy = "http-only"
      origin_ssl_protocols = ["TLSv1.2"]
    }
  }

  logging_config {
    include_cookies = false
    bucket = "logs.${var.domain}.s3.amazonaws.com"
    prefix = "cloudfront/"
  }

  default_cache_behavior {
    allowed_methods = ["GET", "HEAD"]
    cached_methods = ["GET", "HEAD"]
    compress = true,
    default_ttl = 86400
    max_ttl = 31536000
    min_ttl = 0
    target_origin_id = "${var.domain}"
    viewer_protocol_policy = "redirect-to-https"

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }
  }

  viewer_certificate {
    minimum_protocol_version = "TLSv1"
    acm_certificate_arn = "${data.aws_acm_certificate.domain.arn}"
    ssl_support_method = "sni-only"
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  enabled = true
  aliases = ["${var.domain}"]
  default_root_object = "index.html"
}

resource "aws_route53_zone" "domain" {
  name = "${var.domain}."
}

resource "aws_route53_record" "apex" {
  zone_id = "${aws_route53_zone.domain.zone_id}"
  name = "${var.domain}"
  type = "A"

  alias {
    name = "${aws_cloudfront_distribution.distribution.domain_name}"
    zone_id = "${aws_cloudfront_distribution.distribution.hosted_zone_id}"
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "mx" {
  zone_id = "${aws_route53_zone.domain.zone_id}"
  name = "${var.domain}"
  type = "MX"
  ttl = "300"
  records = ["10 mx.hover.com.cust.hostedemail.com"]
}
