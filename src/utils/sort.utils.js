const sortUtils = {

    // sortDogsByLastWalk: (dogs) => {
    //     return dogs.sort(function(a, b) {
    //         if(a.walks[0] === undefined && b.walks[0] === undefined) { 
    //             return 0;
    //         } else if(a.walks[0] === undefined) {
    //                 return -1;
    //         } else if(b.walks[0] === undefined) {
    //             return 1;
    //         }
    //         const lastWalkA = timeUtil.convertDateInDaysUntilToday(a.walks[0].date);
    //         const lastWalkB = timeUtil.convertDateInDaysUntilToday(b.walks[0].date);
   
    //         return lastWalkB - lastWalkA;
    //     });	
    // },

    sortAnimalsByName: (animals) => {
        return animals.sort(function(a, b) {
            if (a.name > b.name) {
                return 1;
            }
            if (b.name > a.name) {
                return -1;
            }
            return 0;
        });
    }
};

export default sortUtils;