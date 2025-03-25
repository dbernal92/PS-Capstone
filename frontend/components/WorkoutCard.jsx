const WorkoutCard = ({ date, exercises, weightUnit}) => {
    const formatDate = (iso) => {
        const d = new Date(iso);
        return d.toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        })
    }
}