"""Xonsh activate script for virtualenv"""
from xonsh.tools import get_sep as _get_sep

def _deactivate(args):
    if "pydoc" in aliases:
        del aliases["pydoc"]

    if ${...}.get("_OLD_VIRTUAL_PATH", ""):
        $PATH = $_OLD_VIRTUAL_PATH
        del $_OLD_VIRTUAL_PATH

    if ${...}.get("_OLD_VIRTUAL_PYTHONHOME", ""):
        $PYTHONHOME = $_OLD_VIRTUAL_PYTHONHOME
        del $_OLD_VIRTUAL_PYTHONHOME

    if "VIRTUAL_ENV" in ${...}:
        del $VIRTUAL_ENV

    if "nondestructive" not in args:
        # Self destruct!
        del aliases["deactivate"]


# unset irrelevant variables
_deactivate(["nondestructive"])
aliases["deactivate"] = _deactivate

$VIRTUAL_ENV = r"/media/timbo/4A66AF4A66AF359B/Programming/chrome-extensions/chrome_new_tab_weather_unsplash/backend/flask"

$_OLD_VIRTUAL_PATH = $PATH
$PATH = $PATH[:]
$PATH.add($VIRTUAL_ENV + _get_sep() + "bin", front=True, replace=True)

if ${...}.get("PYTHONHOME", ""):
    # unset PYTHONHOME if set
    $_OLD_VIRTUAL_PYTHONHOME = $PYTHONHOME
    del $PYTHONHOME

aliases["pydoc"] = ["python", "-m", "pydoc"]
