(function () {
  const Fragment = Symbol("Fragment");
  let rootContainer = null;
  let rootVNode = null;
  let hooks = [];
  let hookIndex = 0;

  function flatten(items, result = []) {
    items.forEach((item) => {
      if (Array.isArray(item)) {
        flatten(item, result);
      } else if (item !== null && item !== undefined && item !== false && item !== true) {
        result.push(item);
      }
    });
    return result;
  }

  function createElement(type, props, ...children) {
    return {
      type,
      props: props || {},
      children: flatten(children),
    };
  }

  function useState(initialValue) {
    const index = hookIndex;
    if (hooks[index] === undefined) {
      hooks[index] = typeof initialValue === "function" ? initialValue() : initialValue;
    }
    const setState = (nextValue) => {
      const value = typeof nextValue === "function" ? nextValue(hooks[index]) : nextValue;
      hooks[index] = value;
      renderRoot();
    };
    hookIndex += 1;
    return [hooks[index], setState];
  }

  function useMemo(factory) {
    return factory();
  }

  function setProp(element, name, value) {
    if (name === "children" || name === "key") return;
    if (name === "className") {
      element.setAttribute("class", value || "");
      return;
    }
    if (name === "htmlFor") {
      element.setAttribute("for", value || "");
      return;
    }
    if (name.startsWith("on") && typeof value === "function") {
      element.addEventListener(name.slice(2).toLowerCase(), value);
      return;
    }
    if (name === "value" || name === "checked" || name === "disabled" || name === "autoFocus") {
      element[name] = value;
      if (name === "disabled" && value) element.setAttribute("disabled", "");
      return;
    }
    if (value === false || value === null || value === undefined) return;
    if (value === true) {
      element.setAttribute(name, "");
      return;
    }
    element.setAttribute(name, value);
  }

  function renderNode(vnode, path) {
    if (typeof vnode === "string" || typeof vnode === "number") {
      return document.createTextNode(String(vnode));
    }
    if (!vnode) {
      return document.createTextNode("");
    }
    if (Array.isArray(vnode)) {
      const fragment = document.createDocumentFragment();
      vnode.forEach((child, index) => fragment.appendChild(renderNode(child, `${path}.${index}`)));
      return fragment;
    }
    if (typeof vnode.type === "function") {
      return renderNode(vnode.type({ ...vnode.props, children: vnode.children }), path);
    }
    if (vnode.type === Fragment) {
      const fragment = document.createDocumentFragment();
      vnode.children.forEach((child, index) => fragment.appendChild(renderNode(child, `${path}.${index}`)));
      return fragment;
    }

    const element = document.createElement(vnode.type);
    element.setAttribute("data-vpath", path);
    Object.keys(vnode.props || {}).forEach((name) => setProp(element, name, vnode.props[name]));
    vnode.children.forEach((child, index) => element.appendChild(renderNode(child, `${path}.${index}`)));
    return element;
  }

  function activeSnapshot() {
    const active = document.activeElement;
    if (!active || !active.getAttribute) return null;
    return {
      path: active.getAttribute("data-vpath"),
      start: active.selectionStart,
      end: active.selectionEnd,
    };
  }

  function restoreActive(snapshot) {
    if (!snapshot || !snapshot.path) return;
    const element = rootContainer.querySelector(`[data-vpath="${snapshot.path}"]`);
    if (!element || typeof element.focus !== "function") return;
    element.focus();
    if (typeof snapshot.start === "number" && typeof element.setSelectionRange === "function") {
      element.setSelectionRange(snapshot.start, snapshot.end);
    }
  }

  function renderRoot() {
    if (!rootContainer || !rootVNode) return;
    const snapshot = activeSnapshot();
    hookIndex = 0;
    rootContainer.replaceChildren(renderNode(rootVNode, "0"));
    restoreActive(snapshot);
  }

  function render(vnode, container) {
    rootVNode = vnode;
    rootContainer = container;
    renderRoot();
  }

  window.React = { createElement, useState, useMemo, Fragment };
  window.ReactDOM = {
    createRoot(container) {
      return {
        render(vnode) {
          render(vnode, container);
        },
      };
    },
  };
})();
