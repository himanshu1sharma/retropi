#!/bin/bash
# 
# a simple node.js, npm installation script 
#  Author : RPS Deepan < developer.rps@gmail.com >
#

echo
echo ' **** [0] Update packages ****'
echo
sudo apt-get update


echo
echo ' **** [1] Creating directory : /opt/node ****'
echo
#Make a new dir where you'll put the binary
sudo mkdir /opt/node

echo
echo ' **** [2] Download node-v0.11.3-linux-arm-pi.tar.gz ****'
echo
wget -c http://nodejs.org/dist/v0.11.3/node-v0.11.3-linux-arm-pi.tar.gz

echo
echo ' **** [3] Extracting node-v0.11.3-linux-arm-pi.tar.gz ****'
echo
tar xvzf node-v0.11.3-linux-arm-pi.tar.gz

echo
echo ' **** [4] Copying extracted folder to /opt/node/ ****'
echo
sudo cp -r node-v0.11.3-linux-arm-pi/* /opt/node
 
 echo 
 echo ' **** [4] Copying extracted folder to /opt/node/ ****'
 echo
 sudo echo 'PATH=$PATH:/opt/node/bin' >> /home/pi/.bashrc
 sudo echo 'export PATH' >> /home/pi/.bashrc
 source /home/pi/.bashrc

 echo
 echo ' **** [5] Installing npm (just to be sure) ****'
 echo 
 sudo apt-get install npm

 echo
 echo '**** [6] Testing if node and npm are installed ****'
 echo
 echo '--- NODE ---'
 node -v
 echo
 echo '--- NPM ---'
 npm -v
 echo


 echo
 echo ' **** [7] Installing git (DVCS)  ****'
 echo 
 sudo apt-get install git-core

 echo
 echo '**************[8] Installing GPIO  ***************'

 git clone git://github.com/quick2wire/quick2wire-gpio-admin.git
 cd quick2wire-gpio-admin
 make
 sudo make install
 sudo adduser $USER gpio

 echo '---DONE------'

 exit