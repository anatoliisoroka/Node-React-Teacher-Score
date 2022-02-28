const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1) {
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `SELECT id, first_name, last_name, score FROM students LIMIT ${offset}, ${config.listPerPage}`
    );
    const students = helper.emptyOrRows(rows);
    const meta = { page };

    return {
        students,
        meta
    }
}

async function create(student) {
    const result = await db.query(
        `INSERT INTO students (first_name, last_name, score) 
        VALUES 
        (${student.first_name}, ${student.last_name}, ${student.score})`
    );
  
    let message = 'Error in creating student';
  
    if (result.affectedRows) {
        message = 'Student created successfully';
    }
  
    return { message };
}

async function update(id, student) {
    const result = await db.query(
      `UPDATE students 
      SET first_name="${student.first_name}", last_name="${student.last_name}", score=${student.score}
      WHERE id=${id}`
    );
  
    let message = 'Error in updating student';
  
    if (result.affectedRows) {
      message = 'Student updated successfully';
    }
  
    return { message };
}

async function remove(id) {
    const result = await db.query(
      `DELETE FROM students WHERE id=${id}`
    );
  
    let message = 'Error in deleting student';
  
    if (result.affectedRows) {
      message = 'Student deleted successfully';
    }
  
    return { message };
}

module.exports = {
    getMultiple,
    create,
    update,
    remove
}
