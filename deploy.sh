#!/bin/sh

ssh root@run4rights.net <<EOF
  cd /var/www/vhosts/run4rights.net
  git fetch origin master
  git reset --hard origin/master
  make
EOF
