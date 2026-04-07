# Cleanup Checklist

## Before changing structure
- Confirm the current behavior that must stay intact.
- Identify whether the problem is duplication, naming drift, mixed concerns, or dead code.
- Check whether the cleanup belongs to a larger architecture issue instead.

## Good cleanup targets
- Repeated JSX structures with real shared behavior.
- Helpers duplicated across components.
- Branches that are no longer reachable or meaningful.
- Files that contain multiple responsibilities with unclear naming.

## Review checklist
- Did complexity actually go down?
- Did the cleanup avoid public API churn unless needed?
- Are new abstractions justified by more than one real use?
- Are imports, names, and file placement clearer than before?
