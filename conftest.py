import warnings

import pytest


@pytest.hookimpl(hookwrapper=True)
def pytest_runtest_makereport(item, call):
    """Downgrade 403 Forbidden link-check failures to warnings."""
    outcome = yield
    report = outcome.get_result()
    if report.failed and call.excinfo is not None:
        exc_value = call.excinfo.value
        exc_str = str(getattr(exc_value, "error", exc_value))
        if "403" in exc_str:
            warnings.warn(f"Link returned 403 Forbidden (skipped): {item.name}", stacklevel=2)
            report.outcome = "passed"
