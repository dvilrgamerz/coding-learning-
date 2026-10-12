// Provider failure disclosure without blocking the offline lesson catalog.
export function learningDependencyWarnings({online, pythonRuntime, cloudSdk}) {
  const warnings = [];
  if (!online) warnings.push('You appear offline. Saved lessons can still be read, but cloud sync and Python runtime downloads may be unavailable.');
  if (!pythonRuntime) warnings.push('Python runtime could not load. Code execution is unavailable until Pyodide loads successfully.');
  if (!cloudSdk) warnings.push('Cloud authentication library did not load. Local learning remains available, but account sync is temporarily unavailable.');
  return warnings;
}
function renderHealth() {
  const warnings = learningDependencyWarnings({
    online: navigator.onLine,
    pythonRuntime: typeof window.loadPyodide === 'function',
    cloudSdk: typeof window.supabase?.createClient === 'function'
  });
  const old = document.querySelector('#learning-dependency-status');
  if (!warnings.length) { old?.remove(); return; }
  const panel = old || document.createElement('aside');
  panel.id = 'learning-dependency-status';
  panel.setAttribute('role', 'status');
  panel.setAttribute('aria-live', 'polite');
  panel.style.cssText = 'position:relative;z-index:1000;margin:10px auto;max-width:1100px;padding:12px 16px;border:1px solid #e6a63a;border-radius:12px;background:#2c220d;color:#fff3ce;font:14px/1.5 system-ui,sans-serif';
  panel.replaceChildren();
  const title = document.createElement('strong');
  title.textContent = 'Learning services status';
  panel.appendChild(title);
  for (const warning of warnings) {
    const line = document.createElement('p');
    line.textContent = warning;
    line.style.margin = '4px 0';
    panel.appendChild(line);
  }
  if (!old) document.body.prepend(panel);
}
if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  window.addEventListener('load', renderHealth);
  window.addEventListener('online', renderHealth);
  window.addEventListener('offline', renderHealth);
}
