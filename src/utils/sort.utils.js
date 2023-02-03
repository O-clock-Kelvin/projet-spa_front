// import timeUtil from "./time.utils";
import {DateTime} from 'luxon';
const sortUtils = {

    sortDogsByLastWalk: (dogs) => {
        return dogs.sort(function(a, b) {
            const aDate = DateTime.fromISO(a.walks[0].date);
				const bDate = DateTime.fromISO(b.walks[0].date);

				if (aDate > bDate) {
					return 1;
				} else if (aDate < bDate) {
					return -1;
				} else {
					return 0;
				}

            // if(a.walks[0] === undefined && b.walks[0] === undefined) { 
            //     return 0;
            // } else if(a.walks[0] === undefined) {
            //         return -1;
            // } else if(b.walks[0] === undefined) {
            //     return 1;
            // }
            // const lastWalkA = timeUtil.convertDateInDaysUntilToday(a.walks[0].date);
            // const lastWalkB = timeUtil.convertDateInDaysUntilToday(b.walks[0].date);
   
            // return lastWalkB - lastWalkA;
        });	
    },

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