import('inquirer').then(async (inquirer) => {
    const fs = await import('fs'); // Import the fs module here

    const answers = await inquirer.default.prompt([
        {
            type: 'input',
            name: 'projectName',
            message: 'Enter the project name:'
        },
        {
            type: 'input',
            name: 'description',
            message: 'Enter a brief description or overview of the project:'
        }
        // Add more prompts as needed
    ]);

    const readmeContent = `# ${answers.projectName}\n\n${answers.description}\n\n## Installation\n\n## Usage\n\n## API Endpoints\n\n## License\n`;

    fs.writeFileSync('README.md', readmeContent);

    console.log('README.md file generated successfully!');
}).catch(error => {
    console.error('Error:', error);
});
