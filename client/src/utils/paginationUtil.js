const pageRange = (page, pageCount) => {

    let start = page - 2,
        end = page + 2;

    if (end > pageCount) {
        start -= (end - pageCount);
        end = pageCount;
    }
    if (start <= 0) {
        end += ((start - 1) * (-1));
        start = 1;
    }

    end = end > pageCount ? pageCount : end;

    return { start, end };
};

const pageArray = (viewPages, startPage, totalPages) => {

    const arrP = Array(viewPages).fill(totalPages);

    const result = [];

    for (let i = 0; i < arrP.length; i++) {
        if(totalPages === i) {
            return;
        } else {
        }
        result.push(i + startPage);
    };

    return result;
};

const paginationUtil = {
    pageRange,
    pageArray,
};

export default paginationUtil;