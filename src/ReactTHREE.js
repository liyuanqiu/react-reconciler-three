import ReactReconciler from "react-reconciler";
import {
  BoxGeometry,
  MeshBasicMaterial,
  Mesh,
  Scene,
  PerspectiveCamera,
  WebGLRenderer
} from "three";

const logConfig = {
  createInstance: true,
  appendChildToContainer: true,
  appendChild: true,
  appendInitialChild: true,
  removeChildFromContainer: true,
  removeChild: true,
  insertInContainerBefore: true,
  insertBefore: true,
  prepareUpdate: false,
  commitUpdate: false
};

function log(type, args) {
  if (logConfig[type] === true) {
    console.log(`*** ${type} ***`);
    console.log(args);
  }
}

let reconciler = ReactReconciler({
  /* configuration for how to talk to the host environment */
  /* aka "host config" */

  supportsMutation: true,

  createInstance(
    type,
    props,
    rootContainerInstance,
    hostContext,
    internalInstanceHandle
  ) {
    log("createInstance", arguments);
    switch (type) {
      case "threeBoxGeometry": {
        const { width, height, depth } = props;
        return new BoxGeometry(width, height, depth);
      }
      case "threeMeshBasicMaterial": {
        const { parameters } = props;
        return new MeshBasicMaterial(parameters);
      }
      case "threeMesh": {
        const {
          rotation: { x, y }
        } = props;
        const mesh = new Mesh();
        if (x !== undefined) {
          mesh.rotation.x = x;
        }
        if (y !== undefined) {
          mesh.rotation.y = y;
        }
        return mesh;
      }
      case "threeScene": {
        return new Scene();
      }
      case "threePerspectiveCamera": {
        const {
          fov,
          aspect,
          near,
          far,
          position: { x, y, z }
        } = props;
        const camera = new PerspectiveCamera(fov, aspect, near, far);
        if (x !== undefined) {
          camera.position.x = x;
        }
        if (y !== undefined) {
          camera.position.y = y;
        }
        if (z !== undefined) {
          camera.position.z = z;
        }
        return camera;
      }
      case "threeWebGLRenderer": {
        const { width, height, antialias } = props;
        const renderer = new WebGLRenderer({
          antialias
        });
        renderer.setSize(width, height);
        return {
          renderer,
          scene: null,
          camera: null
        };
      }
      default:
        return null;
    }
  },
  createTextInstance(
    text,
    rootContainerInstance,
    hostContext,
    internalInstanceHandle
  ) {
    return null;
  },

  appendChildToContainer(container, child) {
    log("appendChildToContainer", arguments);
    container.appendChild(child.renderer.domElement);
  },
  appendChild(parent, child) {
    log("appendChild", arguments);
  },
  appendInitialChild(parent, child) {
    log("appendInitialChild", arguments);
    if (parent.renderer instanceof WebGLRenderer) {
      switch (child.type) {
        case "Scene":
          parent.scene = child;
          break;
        case "PerspectiveCamera":
          parent.camera = child;
          break;
        default:
      }
      if (parent.scene !== null && parent.camera !== null) {
        parent.renderer.render(parent.scene, parent.camera);
      }
    }
    switch (parent.type) {
      case "Mesh": {
        switch (child.type) {
          case "BoxGeometry":
            parent.geometry = child;
            break;
          case "MeshBasicMaterial":
            parent.material = child;
            break;
          default:
        }
        break;
      }
      case "Scene": {
        parent.add(child);
        break;
      }
      default:
    }
  },

  removeChildFromContainer(container, child) {
    log("removeChildFromContainer", arguments);
    container.removeChild(child.renderer.domElement);
  },
  removeChild(parent, child) {
    log("removeChild", arguments);
  },
  insertInContainerBefore(container, child, before) {
    log("insertInContainerBefore", arguments);
  },
  insertBefore(parent, child, before) {
    log("insertBefore", arguments);
  },

  prepareUpdate(
    instance,
    type,
    oldProps,
    newProps,
    rootContainerInstance,
    currentHostContext
  ) {
    log("prepareUpdate", arguments);
    switch (type) {
      case "threeWebGLRenderer": {
        return true;
      }
      case "threeMesh":
        const {
          rotation: { x: ox, y: oy }
        } = oldProps;
        const {
          rotation: { x: nx, y: ny }
        } = newProps;
        if (ox !== nx || oy !== ny) {
          return {
            rotation: newProps.rotation
          };
        }
        break;
      default:
    }
  },
  commitUpdate(
    instance,
    updatePayload,
    type,
    oldProps,
    newProps,
    finishedWork
  ) {
    log("commitUpdate", arguments);
    switch (type) {
      case "threeWebGLRenderer": {
        if (updatePayload === true) {
          const { renderer, scene, camera } = instance;
          if (scene !== null && camera !== null) {
            renderer.render(scene, camera);
          }
        }
        break;
      }
      case "threeMesh":
        if (updatePayload.rotation !== undefined) {
          const {
            rotation: { x, y }
          } = updatePayload;
          if (x !== undefined) {
            instance.rotation.x = x;
          }
          if (y !== undefined) {
            instance.rotation.y = y;
          }
        }
        break;
      default:
    }
  },

  finalizeInitialChildren() {},
  getChildHostContext() {},
  getPublicInstance() {},
  getRootHostContext() {},
  prepareForCommit() {},
  resetAfterCommit() {},
  shouldSetTextContent() {
    return false;
  }
});

let ReactDOMMini = {
  render(whatToRender, div) {
    let container = reconciler.createContainer(div, false, false);
    reconciler.updateContainer(whatToRender, container, null, null);
  }
};

export default ReactDOMMini;
