const GUIDELINE_OFFSET = 5;

export const getLineGuideStops = (stage, skipShape) => {
    const vertical = [0, stage.width() / 2, stage.width()];
    const horizontal = [0, stage.height() / 2, stage.height()];

    stage.find(".object").forEach((guideItem) => {
        if (guideItem === skipShape) {
            return;
        }
        const box = guideItem.getClientRect();
        vertical.push(box.x, box.x + box.width, box.x + box.width / 2);
        horizontal.push(box.y, box.y + box.height, box.y + box.height / 2);
    });
    return {
        vertical: vertical.flat(),
        horizontal: horizontal.flat(),
    };
};

export const getObjectSnappingEdges = (node) => {
    const box = node.getClientRect();
    const absPos = node.absolutePosition();

    return {
        vertical: [
            { guide: Math.round(box.x), offset: Math.round(absPos.x - box.x), snap: "start" },
            { guide: Math.round(box.x + box.width / 2), offset: Math.round(absPos.x - box.x - box.width / 2), snap: "center" },
            { guide: Math.round(box.x + box.width), offset: Math.round(absPos.x - box.x - box.width), snap: "end" },
        ],
        horizontal: [
            { guide: Math.round(box.y), offset: Math.round(absPos.y - box.y), snap: "start" },
            { guide: Math.round(box.y + box.height / 2), offset: Math.round(absPos.y - box.y - box.height / 2), snap: "center" },
            { guide: Math.round(box.y + box.height), offset: Math.round(absPos.y - box.y - box.height), snap: "end" },
        ],
    };
};

export const getGuides = (lineGuideStops, itemBounds) => {
    const resultV = [];
    const resultH = [];

    lineGuideStops.vertical.forEach((lineGuide) => {
        itemBounds.vertical.forEach((itemBound) => {
            const diff = Math.abs(lineGuide - itemBound.guide);
            if (diff < GUIDELINE_OFFSET) {
                resultV.push({ lineGuide, diff, snap: itemBound.snap, offset: itemBound.offset });
            }
        });
    });

    lineGuideStops.horizontal.forEach((lineGuide) => {
        itemBounds.horizontal.forEach((itemBound) => {
            const diff = Math.abs(lineGuide - itemBound.guide);
            if (diff < GUIDELINE_OFFSET) {
                resultH.push({ lineGuide, diff, snap: itemBound.snap, offset: itemBound.offset });
            }
        });
    });

    const guides = [];
    const minV = resultV.sort((a, b) => a.diff - b.diff)[0];
    const minH = resultH.sort((a, b) => a.diff - b.diff)[0];

    if (minV) guides.push({ lineGuide: minV.lineGuide, offset: minV.offset, orientation: "V", snap: minV.snap });
    if (minH) guides.push({ lineGuide: minH.lineGuide, offset: minH.offset, orientation: "H", snap: minH.snap });
    
    return guides;
};