let exec = require('child_process').execSync;

function run(command)
{
    console.log(exec(command).toString())
}

run('npm run build')
run('cd docs/.vuepress/dist')

run('git init')
run('git add -A')
run("git commit -m 'deploy'")

run('git push -f git@github.com:65man/65man.github.io.git master')

run('cd -')