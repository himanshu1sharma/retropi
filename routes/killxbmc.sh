echo 'KILLING XBMC!!!!'
ps -ef | awk '/xbmc/{print $2}'| xargs kill
echo 'Mission accomplished, XBMC is DEAD!!!!'