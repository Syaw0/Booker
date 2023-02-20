import { Request, Response } from "express";
import fs from "fs";
import path from "path";

const __cwd = process.cwd();

const getBookCoverById = (req: Request, res: Response) => {
  const { id } = req.params;
  const basePath = path.join(__cwd + "/public/bookCover/");
  const profs = fs.readdirSync(basePath);
  profs.forEach((profName) => {
    if (profName.split(".")[0] == id) {
      res.sendFile(basePath + profName);
    }
  });
};

export default getBookCoverById;
