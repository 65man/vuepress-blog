let exec = require('child_process').exec;

function run(command)
{
    exec(command, (err, stdout, stderr) => {
        // if (err) {
        //     console.error(err)
        // }
        if (stdout) {
            console.log(stdout)
        }
        if (stderr) {
            console.error(stderr)
        }
    })
}

run('npm run build')
run('cd docs/.vuepress/dist')

run('git init')
run('git add -A')
run("git commit -m 'deploy'")

run('git push -f git@github.com:65man/65man.github.io.git master')

run('cd -')