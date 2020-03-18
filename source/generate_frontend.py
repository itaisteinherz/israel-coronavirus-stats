import json
import os
from typing import Any, Dict

from jinja2 import Template
import dateparser

from process_data import get_relevant_reports

COUNTRY = "Israel"
TEMPLATE_PATH = "source/templates/index.html"
OUTPUT_DIR = "dist"
OUTPUT_FILENAME = "index.html"


def get_latest_report(reports: Dict[str, Any]):
    """Get the latest report in the reports JSON file at the given path"""
    dates = list(reports.keys())
    parsed_dates = [dateparser.parse(date) for date in dates]
    latest_date = sorted(parsed_dates)[-1]
    latest_date_str = f"{str(latest_date.month).zfill(2)}-{str(latest_date.day).zfill(2)}-{latest_date.year}"
    return reports[latest_date_str]


def generate_template_from_report(template_path: str, reports: Dict[str, Any], report: Dict[str, Any]) -> str:
    """Render the template at the given path using the given report"""
    with open(template_path, "r") as t:
        template = Template(t.read())
        rendered_template = template.render(date=report["Last Update"], cases=report["Confirmed"],
                                            deaths=report["Deaths"], recovered=report["Recovered"],
                                            reports=json.dumps(reports))
        return rendered_template


def write_to_file(directory: str, filename: str, contents: str):
    """Write the given contents to the file inside the given directory, and create in case it doesn't exist yet."""
    if not os.path.exists(directory):
        os.makedirs(directory)
    with open(os.path.join(directory, filename), "w") as f:
        f.write(contents)


def main():
    reports = get_relevant_reports(COUNTRY)
    latest_report = get_latest_report(reports)
    rendered_template = generate_template_from_report(TEMPLATE_PATH, reports, latest_report)
    write_to_file(OUTPUT_DIR, OUTPUT_FILENAME, rendered_template)


if __name__ == "__main__":
    main()
