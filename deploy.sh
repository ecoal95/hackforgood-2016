#!/bin/sh

ssh root@run4rights.net <<EOF
  cd /var/www/html/hackforgood-2016
  git fetch origin master
  git reset --hard origin/master
  make
EOF
