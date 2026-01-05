import subprocess
from datetime import datetime, timedelta
import sys

def get_report_metadata(days):
    end_date = datetime.now()
    start_date = end_date - timedelta(days=days)
    date_range_str = f"{start_date.strftime('%Y-%m-%d')}-to-{end_date.strftime('%Y-%m-%d')}"
    return start_date, end_date, date_range_str

def generate_markdown(days=7):
    start, end, date_range = get_report_metadata(days)
    
    # Header inspired by your sample
    md = f"# Engineering Activity Report\n"
    md += f"**Period:** {start.strftime('%B %d')} - {end.strftime('%B %d, %Y')} ({days} days)\n\n" [cite: 2]
    
    # ... (Rest of your analysis logic from previous step)
    
    md += "### Summary Metrics\n"
    # Placeholder for logic to count commits via git log
    md += f"* **Total Commits:** Analysis for {date_range}\n" [cite: 3]
    
    return md, date_range

if __name__ == "__main__":
    # Check if monthly or weekly
    period = 30 if "monthly" in sys.argv else 7
    content, filename = generate_markdown(period)
    
    # Write the report content
    with open("report.md", "w") as f:
        f.write(content)
    
    # Print the filename so GitHub Actions can capture it
    print(filename)
