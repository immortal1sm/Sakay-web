// server/module/announcements/announcement.controller.js
import AnnouncementModel from "./announcement.model.js";

const isProduction = process.env.NODE_ENV === 'production';

const sendError = (res, error, fallbackMsg) => {
    console.error(fallbackMsg, error);
    if (isProduction) {
        return res.status(500).json({ message: 'An internal error occurred. Please try again later.' });
    }
    return res.status(500).json({ message: fallbackMsg + ': ' + error.message });
};

export const getAllAnnouncements = async (req, res) => {
    try {
        const announcements = await AnnouncementModel.findAll();
        res.status(200).json(announcements);
    } catch (error) {
        sendError(res, error, 'Error fetching announcements');
    }
};

export const createAnnouncement = async (req, res) => {
    try {
        const { title, content, priority } = req.body;
        const announcementData = {
            title,
            content,
            priority,
            authorId: req.user._id,
            authorName: req.user.fullName
        };
        const newAnnouncement = await AnnouncementModel.create(announcementData);
        res.status(201).json(newAnnouncement);
    } catch (error) {
        sendError(res, error, 'Error creating announcement');
    }
};

export const updateAnnouncement = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content, priority } = req.body;
        await AnnouncementModel.updateById(id, { title, content, priority });
        res.status(200).json({ message: "Announcement updated" });
    } catch (error) {
        sendError(res, error, 'Error updating announcement');
    }
};

export const deleteAnnouncement = async (req, res) => {
    try {
        const { id } = req.params;
        await AnnouncementModel.deleteById(id);
        res.status(200).json({ message: "Announcement deleted" });
    } catch (error) {
        sendError(res, error, 'Error deleting announcement');
    }
};