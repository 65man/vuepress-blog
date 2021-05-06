let exec = require('child_process').execSync;

function run(command, working_dir = 'docs/.vuepress/dist')
{
  if (working_dir)
    console.log(exec(`cd ${working_dir} && ${command}`).toString())
  else
    console.log(exec(command).toString())
}

run('npm run build', null)

run('git init')
run('git add -A')
run("git commit -m 'deploy'")

run('git push -f git@github.com:65man/65man.github.io.git master')

// run('cd -')