type Options = {
  resizeType: "width" | "height";
  max: number;
  min: number;
};
export const useDragResize = (
  dragEl: HTMLElement,
  targetEl: HTMLElement,
  options?: Partial<Options>
) => {
  const { resizeType = "height", max, min } = options || {};
  dragEl.onmousedown = (event) => {
    const startY = event.clientY;
    const startX = event.clientX;

    const { height, width } = targetEl.getBoundingClientRect();

    const handleDrag = (event: MouseEvent) => {
      if (resizeType === "height") {
        const diffY = startY - event.clientY;
        let targetHeight = height + diffY;

        if (max && targetHeight > max) {
          targetHeight = max;
        }

        if (min && targetHeight < min) {
          targetHeight = min;
        }

        targetEl.style.height = `${targetHeight}px`;
      }

      if (resizeType === "width") {
        const diffX =  event.clientX - startX;

        let targetWidth = width + diffX;

        if (max && targetWidth > max) {
          targetWidth = max;
        }

        if (min && targetWidth < min) {
          targetWidth = min;
        }

        targetEl.style.width = `${targetWidth}px`;
      }
    };

    const stopDrag = () => {
      document.removeEventListener("mousemove", handleDrag);
      document.removeEventListener("mouseup", stopDrag);
    };

    document.addEventListener("mousemove", handleDrag);
    document.addEventListener("mouseup", stopDrag);
  };
};
