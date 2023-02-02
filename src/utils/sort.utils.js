import timeUtil from "./time.utils";

const sortUtils = {

    sortDogsByLastWalk: (dogs) => {
        console.log("toto");
        return dogs.sort(function(a, b) {
            if(a.walks[0] === undefined && b.walks[0] === undefined) { 
                return 0;
            } else if(a.walks[0] === undefined) {
                    return -1;
            } else if(b.walks[0] === undefined) {
                return 1;
            }
            const lastWalkA = timeUtil.convertDateInDaysUntilToday(a.walks[0].date);
            const lastWalkB = timeUtil.convertDateInDaysUntilToday(b.walks[0].date);
            console.log(lastWalkA , lastWalkB);
            return lastWalkB - lastWalkA;
        });	
    }
};

export default sortUtils;