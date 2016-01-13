Vagrant.configure(2) do |config|
    config.vm.hostname = "website"
    config.vm.box = "ubuntu/vivid64"

    config.vm.synced_folder ".", "/vagrant", disabled: true
    config.vm.synced_folder ".", "/home/vagrant/workspace"

    config.vm.provision "shell", privileged: false, inline: %(
        sudo apt-get update && sudo apt-get -y dist-upgrade
        if [[ ! -d .files ]]
        then
            git clone git://github.com/whymarrh/dotfiles .files
            VAGRANT=true .files/install 2>&1
        fi
    )

    config.vm.provider "virtualbox" do |virtualbox|
        virtualbox.linked_clone = true if Vagrant::VERSION =~ /^1.8/
    end
end
