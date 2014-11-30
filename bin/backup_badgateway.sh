#!/bin/bash

TMP_DIR="/tmp/"
DATE=$(date +"%d-%m-%Y_%H%M")
BKP_FILE="$TMP_DIR/bg_$DATE.tar"
BKP_DIRS="/www/ghost/content/data"
DROPBOX_UPLOADER=/www/ghost/bin/dropbox_uploader.sh

tar cf "$BKP_FILE" $BKP_DIRS
gzip "$BKP_FILE"

$DROPBOX_UPLOADER -f /www/ghost/.dropbox_uploader upload "$BKP_FILE.gz" /

rm -fr "$BKP_FILE.gz"
