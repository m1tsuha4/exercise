const express = require('express');
const bodyParser = require('body-parser');
const exercises = require('./Exercise.json'); // Impor data latihan dari file JSON

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get('/exercises', (req, res) => {
    const { equipment } = req.query;

    // Cari latihan yang memiliki equipment sesuai dengan query parameter
    const filteredExercises = exercises.filter(exercise => exercise.equipment === equipment);

    if (filteredExercises.length > 0) {
        return res.json({
            data: filteredExercises,
            status: {
                code: 200,
                message: 'Success retrieving exercises'
            }
        });
    } else {
        return res.status(404).json({
            status: {
                code: 404,
                message: 'Exercises not found for the specified equipment'
            }
        });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
