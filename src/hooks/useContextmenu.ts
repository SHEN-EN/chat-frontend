import { render, createVNode, type ComponentInternalInstance } from "vue";
import contextmenu from "@/components/contextmenu.vue";
import type { menuItem } from "@/types/global";
let vm: null | ComponentInternalInstance;
const container = document.createElement("div");

export const useContextmenu = (menuItem: menuItem[]) => {
  const { width:windowWidth, height:windowHeight } = document.body.getClientRects()[0];

  document.addEventListener("contextmenu", (e) => {
    e.preventDefault();

    const { clientX, clientY } = e;

    vm = vm || createContextmenu();

    const {width, height} = vm.vnode.el!.getClientRects()[0]

    if(width+clientX > windowWidth){ // overfollw
        vm.props.position = {
            right:windowWidth-clientX,
            top:clientY
        }
        return
    }

    if(height+clientY > windowHeight){ // overfollw
        vm.props.position = {
            bottom:windowHeight-clientY,
            left:clientX
        }
        return
    }

    vm.props.position = {
        left:clientX,
        top:clientY
    }
  });

  document.addEventListener("click", () => {
    render(null, container);
    vm = null;
  });

  const createContextmenu = (): ComponentInternalInstance => {

    const vnode = createVNode(contextmenu, {
      menu: menuItem,
    });
    render(vnode, container);
    document.body.appendChild(container.firstElementChild!);

    return vnode.component as ComponentInternalInstance;
  };
};
