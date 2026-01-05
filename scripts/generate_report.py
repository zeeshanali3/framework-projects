import os
import subprocess
import json
from datetime import datetime, timedelta

def get_git_logs(days=7):
    since = (datetime.now() - timedelta(days=days)).strftime('%Y-%m-%d')
    # Fetching: Hash, Author, Date, Subject, and Body
    cmd = f'git log --since="{since}" --pretty=format:"%h|%an|%ad|%s|%b" --date=short'
    return subprocess.check_output(cmd, shell=True).decode('utf-8').split('\n')

def analyze_commits(logs):
    report_data = {}
    categories = {"Feature": 0, "Infrastructure": 0, "Bug": 0, "Admin": 0}
    
    for line in logs:
        if not line: continue
        hash, author, date, subject, body = line.split('|', 4)
        
        # Calculate Message Score (similar to your sample 1-10 scale) 
        score = 5 # Base score
        if any(prefix in subject.lower() for prefix in ['feat:', 'fix:', 'docs:']): score += 3
        if len(subject) > 20: score += 2
        
        # Categorize Work [cite: 11]
        if 'feat' in subject.lower(): categories["Feature"] += 1
        elif 'fix' in subject.lower() or 'bug' in subject.lower(): categories["Bug"] += 1
        elif 'infra' in subject.lower() or 'config' in subject.lower(): categories["Infrastructure"] += 1
        else: categories["Admin"] += 1

        if author not in report_data:
            report_data[author] = {"commits": 0, "score": [], "features": []}
        
        report_data[author]["commits"] += 1
        report_data[author]["score"].append(score)
    
    return report_data, categories

def generate_markdown(data, cats):
    md = "# Engineering Activity Report\n"
    md += f"## Period: Last 7 Days\n\n"
    
    md += "### Team Work Distribution\n| Category | Commits | Description |\n|---|---|---|\n"
    for cat, count in cats.items():
        md += f"| {cat} | {count} | Analysis of {cat} tasks |\n"
        
    md += "\n### Developer Performance\n| Developer | Commits | Msg Score |\n|---|---|---|\n"
    for dev, stats in data.items():
        avg_score = sum(stats['score']) / len(stats['score'])
        md += f"| {dev} | {stats['commits']} | {avg_score:.1f}/10 |\n"
        
    return md

if __name__ == "__main__":
    logs = get_git_logs()
    data, cats = analyze_commits(logs)
    print(generate_markdown(data, cats))
