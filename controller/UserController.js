const { createUser, getUser, getById, updateUser, deleteUser } = require('../model/User');
const { isEmpty } = require('lodash');
const Joi = require('joi');

const rules = Joi.object({
    name: Joi.string().required(),
    pen_name: Joi.string().allow('').optional(),
    age: Joi.number().required(),
    address: Joi.string().required()
});

const create = async (req, res) => {
    try{
        const { error } = rules.validate(req.body);

        if(error) {
            return res.status(400).send({
                message: "Data gagal ditambahkan",
                errors: error.details[0].message
            })
        }

        const {name, pen_name, age, address } = req.body;
        const penName = pen_name ? pen_name : null;

        const user = await createUser(name, penName, age, address);
        return res.status(200).send({
            message: "Data berhasil dibuat",
            data: user
        });
    }catch (error) {
        return res.status(400).send({
            message: "Data gagal dibuat",
            data: error.message
        });
    }
}

const show = async (req, res) => {
    try{
        const data = await getUser();
        return res.status(200).send({
            message: "Semua data ditampilkan",
            data: data 
        });
    }catch (error) {
        return res.status(400).send({
            message: "Data gagal ditampilkan",
            data: error.message
        });
    }
}

const detail = async (req, res) => {
    try{
        let id = req.params.id;
        const data = await getById(id);

        if(isEmpty(data)) {
            return res.status(404).send({
                message: `Data id ${id} tidak ada`,
            });
        }

        return res.status(200).send({
            message: `Data id ${id} berhasil ditampilkan`,
            data: data
        });

    }catch (error) {
        return res.status(400).send({
            message: "Data gagal ditampilkan",
            data: error.message
        });
    }
}

const update = async (req, res) => {
    try{
        const { error } = rules.validate(req.body);

        if(error) {
            return res.status(400).send({
                message: "Data gagal di update",
                errors: error.details[0].message
            })
        }

        const id = req.params.id;
        const {name, pen_name, age, address } = req.body;
        const penName = pen_name ? pen_name : null;
        let data = {
            name: name,
            pen_name: penName,
            age: age,
            address: address
        }

        const updatedRow = await updateUser(id, data);
        const updatedData = await getById(id);

        if(updatedRow[0] === 0){
            return res.status(404).send({
                message: `Data pada id ${id} tidak di temukan`,
                data: updatedData
            });
        }

        return res.status(201).send({
            message: `Data pada id ${id} berhasil di update`,
            data: updatedData,
        });
    } catch (error) {
        return res.status(400).send({
            message: "Data gagal diperbarui",
            data: error.message
        });
    }
}

const destroy = async (req, res) => {
    try{
        const id = req.params.id;
        const del = await deleteUser(id);

        if(del[0] === 0) {
            return res.status(404).send({
                message: `Data pada id ${id} tidak ditemukan`
            });
        }

        return res.status(201).send({
            message: `Data pada id ${id} berhasil di hapus` 
        });
    }catch (error) {
        return res.status(400).send({
            message: "Data gagal dihapus",
            data: error.message
        });
    }
}

module.exports = {
    create,
    show,
    detail,
    update,
    destroy
}