    
function getIndependentArrays(results) {
    try{
    const groupedData = results.reduce((acc, obj) => {
        if (!acc[obj.component_name]) {
            acc[obj.component_name] = [];
        }
        acc[obj.component_name].push(obj);
        return acc;
    }, {});
    const calculateMarks = (groupedData) => {
        const result = {};

        for (const [component_name, items] of Object.entries(groupedData)) {
            const enrollement_marks = items.reduce((acc, obj) => {
                const { enrollement_id, total_marks, obtained_marks } = obj;
                if (!acc[enrollement_id]) {
                    acc[enrollement_id] = { total_marks: 0, obtained_marks: 0 };
                }
                acc[enrollement_id].total_marks += Number(total_marks);
                acc[enrollement_id].obtained_marks += Number(obtained_marks);
                return acc;
            }, {});
            result[component_name] = Object.entries(enrollement_marks).map(([enrollement_id, marks]) => ({
                enrollement_id: Number(enrollement_id),
                total_marks: marks.total_marks,
                obtained_marks: marks.obtained_marks
            }));
        }
        return result;
    };

    return calculateMarks(groupedData);
}
catch(error){
    throw new Error("MaxMinAverageAggregate");
}
}

async function calculateAndAggregateWeightedMarks(results, weightages) {
    try{
    const groupedData = getIndependentArrays(results);
   
    const weightedResult = {};

    for (const [component_name, records] of Object.entries(groupedData)) {
        const weightageObj = weightages.find(w => w.component_name === component_name);
        const weightage = weightageObj ? weightageObj.Weightage : 0;
        const decryptedWeightage = weightage

        weightedResult[component_name] = records.map(record => ({
            ...record,
            Weightedobtained_marks: (record.obtained_marks / record.total_marks) * decryptedWeightage
        }));


    }

    // Aggregate totals
    const totals = {};
    for (const component_name of Object.keys(weightedResult)) {
        const records = weightedResult[component_name];
        
        for (const record of records) {
            const { Weightedobtained_marks } = record;
            if (!totals[record.enrollement_id]) {
                totals[record.enrollement_id] = 0;
            }
            totals[record.enrollement_id] += Weightedobtained_marks;
        }
    }

    // Format each total to 2 decimal places
    const formattedTotals = Object.values(totals).map(total => parseFloat(total.toFixed(2)));

    return { formattedTotals, totals };
}
catch(error){
    throw new Error("MaxMinAverageAggregate");
}
}

async function MaxMinAverageAggregate(results, weightages, targetenrollement_id) {
    try{
    const { formattedTotals, totals } = await calculateAndAggregateWeightedMarks(results, weightages);
    if (formattedTotals.length === 0) {
        return { max: 0, min: 0, average: 0, myAggregate: 0 };
    }

    const max = Math.max(...formattedTotals);
    const min = Math.min(...formattedTotals);
    const average = formattedTotals.reduce((sum, total) => sum + total, 0) / formattedTotals.length;

    const myAggregate = totals[targetenrollement_id] ? parseFloat(totals[targetenrollement_id].toFixed(2)) : 0;

    return {
        max: parseFloat(max.toFixed(2)),
        min: parseFloat(min.toFixed(2)),
        average: parseFloat(average.toFixed(2)),
        myAggregate
    };
    }
    catch(error){
        throw new Error("MaxMinAverageAggregate");
    }

}

module.exports = MaxMinAverageAggregate;
