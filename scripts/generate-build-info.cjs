const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const git = (args) => execSync(`git ${args}`, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();

let gitInfo;
try {
    // 獲取當前的 Git commit hash、分支名與最後一次 commit 的時間
    const commitHash = git('rev-parse HEAD');
    gitInfo = {
        commitHash,
        shortCommitHash: commitHash.substring(0, 7),
        branchName: git('rev-parse --abbrev-ref HEAD'),
        commitDate: git('log -1 --format=%ci'),
    };
} catch (error) {
    console.warn('⚠️  Could not generate build info:', error.message);

    // 如果無法獲取 Git 信息，使用預設值
    gitInfo = {
        commitHash: 'unknown',
        shortCommitHash: 'unknown',
        branchName: 'unknown',
        commitDate: 'unknown',
    };
}

// 創建 build 信息對象
const buildInfo = {
    ...gitInfo,
    buildTime: new Date().toISOString(),
    buildTimestamp: Date.now(), // Add numerical timestamp for consistency
};

// 確保 src 目錄存在
const srcDir = path.join(__dirname, '..', 'src');
fs.mkdirSync(srcDir, { recursive: true });

// 寫入 build 信息到 JSON 文件
fs.writeFileSync(path.join(srcDir, 'build-info.json'), JSON.stringify(buildInfo, null, 2));

// 同時創建一個 TypeScript 模組
const tsContent = `// 這個文件是自動生成的，請不要手動編輯
import type { BuildInfo } from './types/build-info';

export const buildInfo: BuildInfo = ${JSON.stringify(buildInfo, null, 2)};
`;
fs.writeFileSync(path.join(srcDir, 'build-info.ts'), tsContent);

if (gitInfo.commitHash !== 'unknown') {
    console.log('✅ Build info generated:', buildInfo);
}
