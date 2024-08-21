import { Request, Response } from "express";
import Service from "../model/services";
import { Session } from "express-session";

export const hireCleaner = async (req: Request, res: Response) => {
  try {
    const {
      cleanerId,
      name,
      address,
      serviceName,
      description,
      servicePrice,
      date,
    } = req.body;
    const userId = (req.session as any).userId;
    console.log(userId);

    const newService = await Service.create({
      userId,
      cleanerId,
      name,
      address,
      serviceName,
      description,
      servicePrice,
      date,
      status: "Pending",
      serviceRating: 0,
      serviceReview: "Pending",
    });

    res.status(201).json({
      message: "Hiring request sent successfully",
      service: newService,
    });
  } catch (error) {
    console.error("Error hiring cleaner", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllServices = async (req: Request, res: Response) => {
  try {
    const services = await Service.findAll();

    res
      .status(200)
      .json({ message: "Services retrieved successfully", services });
  } catch (error) {
    console.error("Error getting all services", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const acceptService = async (req: Request, res: Response) => {
  try {
    const serviceId = req.params.id;

    const service = await Service.findOne({ where: { id: serviceId } });

    if (!service) {
      res.status(404).json({ message: "Service Data not found" });
    } else {
      service.status = "Accepted";
      await service.save();
      res
        .status(201)
        .json({ message: "Service Accepted successfully", service });
    }
  } catch (error) {
    console.error("Error accepting service", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const rejectService = async (req: Request, res: Response) => {
  try {
    const serviceId = req.params.id;

    const service = await Service.findOne({ where: { id: serviceId } });

    if (!service) {
      res.status(404).json({ message: "Service Data not found" });
    } else {
      service.status = "Rejected";
      await service.save();
      res
        .status(201)
        .json({ message: "Service Rejected successfully", service });
    }
  } catch (error) {
    console.error("Error rejecting service", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getPendingServices = async (req: Request, res: Response) => {
  try {
    const userId = (req.session as any).userId;

    const services = await Service.findAll({
      where: { userId, status: "Pending" },
    });

    res
      .status(200)
      .json({ message: "Services retrieved successfully", services });
  } catch (error) {
    console.error("Error getting all services", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAcceptedServices = async (req: Request, res: Response) => {
  try {
    const userId = (req.session as any).userId;

    const services = await Service.findAll({
      where: { userId, status: "Accepted" },
    });

    res
      .status(200)
      .json({ message: "Services retrieved successfully", services });
  } catch (error) {
    console.error("Error getting all services", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getRejectedServices = async (req: Request, res: Response) => {
  try {
    const userId = (req.session as any).userId;

    const services = await Service.findAll({
      where: { userId, status: "Rejected" },
    });

    res
      .status(200)
      .json({ message: "Services retrieved successfully", services });
  } catch (error) {
    console.error("Error getting all services", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const rateReviewService = async (req: Request, res: Response) => {
  console.log("did you see me");
  try {
    const serviceId = req.params.id;
    const { rating, review } = req.body;

    const service = await Service.findOne({ where: { id: serviceId } });

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    // Update the service with new rating and review
    console.log("Service:", service);

    service.serviceRating = rating;
    service.serviceReview = review;

    await service.save();

    return res
      .status(200)
      .json({ message: "Rating and review updated successfully", service });
  } catch (error) {
    console.error("Error updating rating and review:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getUserServices = async (req: Request, res: Response) => {
  try {
    const userId = (req.session as any).userId;

    const services = await Service.findAll({ where: { userId: userId } });

    res
      .status(200)
      .json({ message: "Services retrieved successfully", services });
  } catch (error) {
    console.error("Error getting all services", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getCleanerServices = async (req: Request, res: Response) => {
  try {
    console.log(req.session);

    const cleanerId = (req.session as any).cleanerId;

    const services = await Service.findAll({ where: { cleanerId: cleanerId } });

    res
      .status(200)
      .json({ message: "Cleaner services retrieved successfully", services });
  } catch (error) {
    console.error("Error getting cleaner services", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getServiceDetails = async (req: Request, res: Response) => {
  try {
    const serviceId = req.params.id;

    const service = await Service.findOne({ where: { id: serviceId } });

    if (!service) {
      res.status(404).json({ message: "Service Data not found" });
    } else {
      res
        .status(201)
        .json({ message: "Service Retrieved successfully", service });
    }
  } catch (error) {
    console.error("Error getting service details", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const editService = async (req: Request, res: Response) => {
  try {
    const serviceId = req.params.id;
    const service = await Service.findOne({ where: { id: serviceId } });

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    Object.assign(service, req.body);

    await service.save();

    return res
      .status(200)
      .json({ message: "Service updated successfully", service });
  } catch (error) {
    console.error("Error updating service:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteService = async (req: Request, res: Response) => {
  try {
    const serviceId = req.params.id;
    const deletedService = await Service.findOne({ where: { id: serviceId } });

    if (!deletedService) {
      res.status(404).json({ message: "Service not found" });
    } else {
      await deletedService.destroy();
    }
    res.status(201).json({
      message: "Service deleted successfully",
      Service: deletedService,
    });
  } catch (error) {
    console.error("Error deleting service:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getUserServiceHistory = async (req: Request, res: Response) => {
  try {
    const userId = (req.session as any).userId;

    const services = await Service.findAll({
      where: { userId },
      attributes: { exclude: ["name"] },
    });

    res.status(200).json({
      message: "User service history retrieved successfully",
      services,
    });
  } catch (error) {
    console.error("Error getting user service history", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getCleanerServiceHistory = async (
  req: Request,
  res: Response
) => {
  try {
    const cleanerId = (req.session as any).cleanerId;

    const services = await Service.findAll({
      where: { cleanerId },
      attributes: { exclude: ["name"] },
    });

    res.status(200).json({
      message: "Cleaner service history retrieved successfully",
      services,
    });
  } catch (error) {
    console.error("Error getting cleaner service history", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
