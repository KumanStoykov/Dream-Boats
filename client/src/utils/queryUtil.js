const queryExtract = (query) => {

    const resultQuery = query.split('&')
                             .reduce((a, x) => {
                                let [k, v] = x.split('=');

                                k = k.indexOf('?') === 0 ? k.split('?')[1] : k; 
                                
                                a[k] = v;
                                return a;
                             }, {});

    return resultQuery;                         
};

const queryUtil = {
    queryExtract,
}

export default queryUtil;