const simpleGit = require('simple-git');
const path = require('path');
const { execSync } = require('child_process');

function isGitInstalled() {
    try {
        execSync('git --version', { stdio: 'ignore' });
        return true;
    } catch (error) {
        console.error('Git is not installed. Please install Git first.');
        process.exit(1);
    }
}

async function setupGitCredentials(username, email) {
    try {
        const git = simpleGit();
        await git.addConfig('user.name', username);
        await git.addConfig('user.email', email);
        console.log('Git credentials configured.');
    } catch (error) {
        console.error('Error configuring Git:', error);
    }
}

async function cloneRepo(repoUrl, localPath) {
    try {
        console.log(`Cloning ${repoUrl} into ${localPath}...`);
        await simpleGit().clone(repoUrl, localPath);
        console.log('Repository cloned successfully!');
    } catch (error) {
        console.error('Error cloning repository:', error);
    }
}

async function main() {
    isGitInstalled();

    const gitUsername = 'Aashir-Adnan';
    const gitEmail = 'aashiradnan99@gmail.com';
    await setupGitCredentials(gitUsername, gitEmail);

    const repoUrl = 'https://github.com/hammadkamran29/UBS-Starter-Project';
    const localPath = path.join(__dirname, '..' ,'UBS-Framework');

    await cloneRepo(repoUrl, localPath);
}

main();
