echo 'KILLING MAME!!!!'
ps -ef | awk '/mame/{print $2}'| xargs kill
echo 'Mission accomplished, MAME is DEAD!!!!'