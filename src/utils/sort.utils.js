const sortUtils = {

    sortAnimalsByName: (animals) => {
        return animals.sort(function(a, b) {
            
            if (a.name.toLowerCase() > b.name.toLowerCase()) {
                return 1;
            }
            if (b.name.toLowerCase() > a.name.toLowerCase()) {
                return -1;
            }
            return 0;
        });
    }
};

export default sortUtils;