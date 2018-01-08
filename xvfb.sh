#!/bin/sh

_kill_procs() {
  kill -TERM $chromium
  wait $chromium
  kill -TERM $xvfb
}

testing=0
parameters=$@

# We need to test if /var/run/dbus exists, since script will fail if it does not

[ ! -e /var/run/dbus ] && mkdir /var/run/dbus

/usr/bin/dbus-daemon --system

# Setup a trap to catch SIGTERM and relay it to child processes
trap _kill_procs SIGTERM

TMP_PROFILE_DIR=`mktemp -d -t chromium.XXXXXX`

# Start Xvfb
Xvfb ${DISPLAY} -ac +iglx -screen 0 ${GEOMETRY} -nolisten tcp & xvfb=$!

printf "Starting xvfb window server..."

while [  1 -gt $xvfb  ]; do printf "..."; sleep 1; done

printf "xvfb started\n\n"

printf "Starting chromium, with debugger on port $CHROME_DEBUGGING_POST...\n\n"

# --disable-webgl \

#$CHROMIUM_PATH \
#--no-sandbox \
#--user-data-dir=${TMP_PROFILE_DIR}  \
#--start-maximized \
#--remote-debugging-port=${CHROME_DEBUGGING_PORT} \
#--no-first-run "about:blank" &

#chromium=$!

#wait4ports tcp://127.0.0.1:$CHROME_DEBUGGING_PORT

if [ $# -gt 0 ]; then
  $@
else
  npm start
fi
