import subprocess
from datetime import datetime, timedelta
import sys
import os

def get_report_metadata(days):
    end_date = datetime.now()
    start_date = end_date - timedelta(days=days)
    date_range_str = f"{start_date.strftime('%Y-%m-%d')}-to-{end_date.strftime('%Y-%m-%d')}"
    return start_date, end_date, date_range_str

def get_git_data(days):
    since = (datetime.now() - timedelta(days=days)).strftime('%Y-%m-%d')
    # Formats: Hash|Author|Subject|Body|FilesChanged
    cmd = f'git log --since="{since}" --pretty=format:"%h|%an|%s|%b" --shortstat'
    try:
        raw_data = subprocess.check_output(cmd, shell=True).decode('utf-8')
        return raw_data
    except:
        return ""

def analyze_performance(raw_logs):
    # This logic replicates the "Developer Value Delivered" table [cite: 7]
    stats = {}
    categories = {"Feature Work": 0, "Infrastructure": 0, "Bug Fixes": 0, "Administrative": 0}
    
    current_author = None
    lines = raw_logs.split('\n')
    
    for line in lines:
        if '|' in line:
            parts = line.split('|')
            h, author, subject, body = parts[0], parts[1], parts[2], parts[3]
            current_author = author
            
            if author not in stats:
                stats[author] = {"commits": 0, "score": [], "tasks": []}
            
            # Score logic based on your sample's 1-10 scale [cite: 9, 46]
            score = 6 # Base
            if any(x in subject.lower() for x in ['feat:', 'fix:', 'docs:']): score += 3
            if len(subject) > 25: score += 1
            
            # Categorization [cite: 11]
            if 'feat' in subject.lower(): categories["Feature Work"] += 1
            elif 'fix' in subject.lower() or 'bug' in subject.lower(): categories["Bug Fixes"] += 1
            elif 'infra' in subject.lower() or 'setup' in subject.lower(): categories["Infrastructure"] += 1
            else: categories["Administrative"] += 1

            stats[author]["commits"] += 1
            stats[author]["score"].append(score)
            stats[author]["tasks"].append(subject)
            
    return stats, categories

def generate_markdown(days=7):
    start, end, date_range = get_report_metadata(days)
    raw_logs = get_git_data(days)
    stats, categories = analyze_performance(raw_logs)

    md = f"# Engineering Activity Report\n"
    md += f"**Period:** {start.strftime('%B %d')} - {end.strftime('%B %d, %Y')} ({days} days)\n\n"
    
    # Dashboard Section [cite: 5, 11]
    md += "## Executive Dashboard\n"
    md += "### Team Work Distribution\n"
    md += "| Category | Commits | Description |\n|---|---|---|\n"
    for cat, count in categories.items():
        md += f"| {cat} | {count} | Activity related to {cat.lower()} |\n"

    # Developer Performance Table [cite: 7]
    md += "\n## Developer Value Delivered\n"
    md += "| Developer | Deliverables | Msg Score |\n|---|---|---|\n"
    for dev, data in stats.items():
        avg_score = sum(data['score']) / len(data['score'])
        top_task = data['tasks'][0] if data['tasks'] else "General Updates"
        md += f"| {dev} | {top_task} | {int(avg_score)}/10 |\n"

    return md, date_range

if __name__ == "__main__":
    period = 30 if (len(sys.argv) > 1 and sys.argv[1] == "monthly") else 7
    content, filename = generate_markdown(period)
    
    with open("report.md", "w") as f:
        f.write(content)
    
    # This prints the filename for the GitHub Action to catch
    print(filename)
