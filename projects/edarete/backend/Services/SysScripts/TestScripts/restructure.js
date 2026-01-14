const fs = require('fs');
const path = require('path');
const BASE_DIR = path.join(__dirname, '../../../Objects');
const OUTPUT_DIR = path.join(__dirname, 'GeneratedApis');

// All source object folders
const SOURCE_FOLDERS = [
    'Crud_Objects',
    'Grouped_Objects',
    'Custom_Objects',
    'Dropdown_Objects'
];

fs.mkdirSync(OUTPUT_DIR, { recursive: true });

function copyRecursive(src, dest) {
    const stats = fs.statSync(src);
    if (stats.isDirectory()) {
        fs.mkdirSync(dest, { recursive: true });
        const entries = fs.readdirSync(src);
        for (const entry of entries) {
            copyRecursive(path.join(src, entry), path.join(dest, entry));
        }
    } else {
        fs.copyFileSync(src, dest);
    }
}

for (const folder of SOURCE_FOLDERS) {
    const sourcePath = path.join(BASE_DIR, folder);
    if (!fs.existsSync(sourcePath)) continue;

    const subfolders = fs.readdirSync(sourcePath);

    for (const subfolder of subfolders) {
        const entityPath = path.join(sourcePath, subfolder);
        const entityStats = fs.statSync(entityPath);
        if (!entityStats.isDirectory()){
            if (folder !== "Dropdown_Objects"){
                 continue;
            }
            else{
                const destEntityFolder = path.join(OUTPUT_DIR, subfolder.split("_")[0], folder);
                fs.mkdirSync(destEntityFolder, { recursive: true });

                const srcFile = path.join(entityPath);
                const destFile = path.join(destEntityFolder, subfolder);
                copyRecursive(srcFile, destFile);

                console.log(`✅ Copied ${folder}/${subfolder} -> ${path.relative(__dirname, destEntityFolder)}`);

            }
        }
        // Destination structure: Objects_Reorganized/<Entity>/<Folder>/
        else if (subfolder == "Generated") {
            for (const genSubfolder of fs.readdirSync(entityPath)) {
                let newEntityPath = path.join(entityPath, genSubfolder);
                const destEntityFolder = path.join(OUTPUT_DIR, genSubfolder, folder);
                fs.mkdirSync(destEntityFolder, { recursive: true });

                // Copy contents of the entity folder
                const files = fs.readdirSync(newEntityPath);
                for (const file of files) {
                    const srcFile = path.join(newEntityPath, file);
                    const destFile = path.join(destEntityFolder, file);
                    copyRecursive(srcFile, destFile);
                }

                console.log(`✅ Copied ${folder}/${genSubfolder} -> ${path.relative(__dirname, destEntityFolder)}`);
            }

        }
        else if (subfolder == "Project_Specific") {
            for (const genSubfolder of fs.readdirSync(entityPath)) {
                let newEntityPath = path.join(entityPath, genSubfolder);
                const destEntityFolder = path.join(OUTPUT_DIR, '..', 'ProjectSpecificApis', genSubfolder, folder);
                fs.mkdirSync(destEntityFolder, { recursive: true });

                // Copy contents of the entity folder
                const files = fs.readdirSync(newEntityPath);
                for (const file of files) {
                    const srcFile = path.join(newEntityPath, file);
                    const destFile = path.join(destEntityFolder, file);
                    copyRecursive(srcFile, destFile);
                }

                console.log(`✅ Copied ${folder}/${genSubfolder} -> ${path.relative(__dirname, destEntityFolder)}`);
            }
        }
        else {
            const destEntityFolder = path.join(OUTPUT_DIR, subfolder, folder);
            fs.mkdirSync(destEntityFolder, { recursive: true });

            // Copy contents of the entity folder
            const files = fs.readdirSync(entityPath);
            for (const file of files) {
                const srcFile = path.join(entityPath, file);
                const destFile = path.join(destEntityFolder, file);
                copyRecursive(srcFile, destFile);
            }

            console.log(`✅ Copied ${folder}/${subfolder} -> ${path.relative(__dirname, destEntityFolder)}`);
        }

    }
}

console.log('\n🎉 Restructuring complete!');