import { Request, Response, NextFunction } from 'express';
import Cleaner from '../model/cleaners';
import bcrypt from 'bcrypt';
import { generateAccessToken } from '../middleware/userAuthentication';

export const createCleaner = async (req: Request, res: Response) => {
  try {
    const existingCleaner = await Cleaner.findOne({
      where: { email: req.body.email },
    });
    if (existingCleaner) {
      return res.status(400).json({ error: "Email is already in use" });
    }
    const password = req.body.password;
    if (!isValidPassword(password)) {
      return res
        .status(400)
        .json({
          error:
            "Password must be at least 5 characters long and contain at least one uppercase letter, one lowercase letter, and one special character",
        });
    }
    const hashpassword = bcrypt.hashSync(password, 10);
    const newCleaner = await Cleaner.create({
      ...req.body,
      password: hashpassword,
    });
    res.redirect("/login");
    // res
    //   .status(201)
    //   .json({ message: "Cleaner Created Successfully", cleaner: newCleaner });
  } catch (error) {
    console.error("Error creating Cleaner");
    res.status(500).json({ message: "Internal server error" });
  }
};
const isValidPassword = (password: string): boolean => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{5,}$/;
  return passwordRegex.test(password);
};

// Get all cleaners
export const getAllCleaners = async (req: Request, res: Response) => {
    try {
        const allCleaners = await Cleaner.findAll();

        if (allCleaners) {
            res.status(201).json({message: "All Cleaner's Retrieved Successfully", Cleaner: allCleaners});
        } else {
            res.status(404).json({message: "No cleaners found"});
        }
    } catch (error) {
        console.error("Error getting all cleaners", error);
        res.status(500).json({message: "Internal server error"});
    }
};

// View details of a single cleaner
export const getCleanerDetails = async (req: Request, res: Response) => {
    try{
        const cleanerId = req.params.id;
        const cleaner = await Cleaner.findOne({where: {id: cleanerId}});

        if (!cleaner) {
            res.status(404).json({message: "Cleaner Data not found"});
        } else {
            res.status(201).json({message: "Cleaner Retrieved successfully", Cleaner: cleaner});
        }
    } catch (error) {
        console.error("Error getting cleaner details", error);
        res.status(500).json({message: "Internal server error"});
    }
};

export const editCleaner = async (req: Request, res: Response) => {
    try{
        const cleanerId = req.params.id;
        const cleaner = await Cleaner.findOne({where: {id: cleanerId}});

        if (!cleaner) {
            return res.status(404).json({message: "Cleaner not found"});
        }

        Object.assign(cleaner, req.body);

        await cleaner.save();

        return res.status(200).json({message: "Cleaner updated successfully", cleaner});
    } catch (error) {
        console.error("Error updating cleaner:", error);
        return res.status(500).json({message: "Internal server error"});
    }
};

export const deleteCleaner = async (req: Request, res: Response) => {
    try{
        const cleanerId = req.params.id;
        const deletedCleaner = await Cleaner.findOne({where: {id: cleanerId}});

        if (!deletedCleaner) {
            res.status(404).json({message: "Cleaner not found"});
        } else {
            await deletedCleaner.destroy();
        }
        res.status(201).json({message: "Cleaner deleted successfully", Cleaner: deletedCleaner});
    } catch (error) {
        console.error("Error deleting cleaner:", error);
        res.status(500).json({message: "Internal server error"});
    }
};

export const loginCleaner = async (req: Request, res: Response, next: NextFunction) => {
    const  email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
        return res.status(400).send({message: "Email and password are required"});
    }

    try {
        const cleaner = await Cleaner.findOne({where: {email: email}});

        if (!cleaner) {
            return res.status(400).json({message: "Invalid email or password"});
        }

        const isPasswordValid = bcrypt.compareSync(password, cleaner.password);

        if (!isPasswordValid) {
            return res.status(400).json({message: "Invalid email or password"});
        }

        const token = generateAccessToken(cleaner);
        const cleanerId = cleaner.id;
        const fullname = cleaner.fullname;
        const gender = cleaner.gender;
        const phonenumber = cleaner.phonenumber;
        const address = cleaner.address;
        const guarantorName = cleaner.guarantorName;
        const guarantorAddress = cleaner.guarantorAddress;
        const guarantorPhoneNumber = cleaner.guarantorPhoneNumber;
        const nextOfKinName = cleaner.nextOfKinName;
        const nextOfKinPhoneNumber = cleaner.nextOfKinPhoneNumber;


        (req.session as any).token = token;
        (req.session as any).cleanerId = cleanerId;
        (req.session as any).fullname = fullname;
        (req.session as any).email = email;
        (req.session as any).gender = gender;
        (req.session as any).phonenumber = phonenumber;
        (req.session as any).address = address;
        (req.session as any).guarantorName = guarantorName;
        (req.session as any).guarantorAddress = guarantorAddress;
        (req.session as any).guarantorPhoneNumber = guarantorPhoneNumber;
        (req.session as any).nextOfKinName = nextOfKinName;
        (req.session as any).nextOfKinPhoneNumber = nextOfKinPhoneNumber;

      
        
        

        next();
    } catch (error) {
        console.error("Error logging in cleaner:", error);
        res.status(500).send({message: "Internal server error"});
    };
};