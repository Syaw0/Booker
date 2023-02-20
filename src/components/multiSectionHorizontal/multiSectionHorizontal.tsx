import Text from "src/components/typography/typography";
import { ReactNode, useState } from "react";
import style from "./multiSectionHorizontal.module.css";
import Layout from "../layouts/multiSectionLayout/layout";
interface LayoutMultipleSectionItems {
  sectionName: string;
  component: ReactNode;
  Icon: (params: IconTypes) => JSX.Element;
}

interface LayoutMultipleSectionHorizontal {
  layoutData: LayoutMultipleSectionItems[];
  topNavExtraComponent?: ReactNode;
  className?: string;
}

const MultiSectionHorizontal = ({
  layoutData,
  className,
}: LayoutMultipleSectionHorizontal) => {
  const [activeSection, setActiveSection] = useState(layoutData[0]);
  const changeSection = (e: number) => {
    if (layoutData[e].sectionName !== activeSection.sectionName) {
      setActiveSection(layoutData[e]);
    }
  };
  return (
    <div data-testid="layoutHolder" className={`${style.holder} ${className}`}>
      <div data-testid="layoutLeft" className={style.left}>
        {activeSection.component}
      </div>
      <div className={style.lowLeft}>
        <Layout className={style.lowWidthLeft} layoutData={layoutData} />
      </div>

      <div data-testid="layoutRight" className={style.right}>
        {layoutData.map((F, i) => {
          return (
            <Text
              testid={F.sectionName}
              onClick={() => {
                changeSection(i);
              }}
              className={`${style.sectionKey} ${
                F.sectionName == activeSection.sectionName
                  ? style.activeSection
                  : ""
              }`}
              key={F.sectionName}
            >
              <F.Icon height="24" width="24" className={style.sectionIcon} />
              {F.sectionName}
            </Text>
          );
        })}
      </div>
    </div>
  );
};

export default MultiSectionHorizontal;
