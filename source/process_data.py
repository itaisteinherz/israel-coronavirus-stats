"""
Generate Israel-specific Coronavirus stats from JHU CSSE data.
"""
from typing import Any, Dict, List
import os
import csv
import json

PATH_TO_DAILY_REPORTS = "data/csse_covid_19_data/csse_covid_19_daily_reports"


def load_all_reports(path_to_reports: str):
    """Load all CSV reports from the given path, parse them, and return the final result"""
    reports = {}

    # Iterate over all reports in the given directory.
    for filename in os.listdir(path_to_reports):
        # We only care about the reports themselves, not other unrelated files.
        if not filename.endswith(".csv"):
            continue
        date = filename[:-4] # To remove the extension

        file_path = os.path.join(path_to_reports, filename)
        # Read each file
        with open(file_path, mode="r", encoding="utf-8-sig", newline="") as report:
            parsed_report = []
            # Read the file and convert it to a `dict`.
            reader = csv.DictReader(report)
            for row in reader:
                parsed_report.append(row)
            # Hack to convert the array of `OrderedDict` objects into a simple `dict`.
            json_report = json.loads(json.dumps(parsed_report))

            # Store the parsed report, using the date as the key.
            reports[date] = json_report

    return reports


def filter_reports_for_field(reports: Dict[str, Any], field_name: str, value: str):
    """Filter the reports using the given field and desired value"""
    result = {}
    for date, report in reports.items():
        filtered_report = next((row for row in report if row[field_name] == value), None)
        if filtered_report is not None:
            result[date] = filtered_report

    return result


def remove_fields(reports: Dict[str, Any], *fields: List[str]):
    """Remove the given unwanted fields from the reports"""
    for date in reports:
        for field in fields:
            reports[date].pop(field)


def get_relevant_reports(country):
    """Get all relevant reports found at the given path"""
    reports = load_all_reports(PATH_TO_DAILY_REPORTS)
    filtered_reports = filter_reports_for_field(reports, "Country/Region", country)
    remove_fields(filtered_reports, "Province/State", "Country/Region")
    return filtered_reports
