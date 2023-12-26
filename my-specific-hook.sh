message="$(cat $1)"
requiredPattern="^\[(AP-[0-9]+)\] .+$"
if ! [[ $message =~ $requiredPattern ]];
then
  echo "-"
  echo "-"
  echo "-"
  echo "🚨 Wrong commit message! 😕"
  echo "The commit message must have this format:"
  echo "[AP-Jira issue Id] - any commit message"
  echo "-"
  echo "Your commit message was:"
  echo $message
  echo "-"
  exit 1
fi
