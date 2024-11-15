import classes from "@/components/family-tree/FamilyTree.module.css";

const FamilyTree = () => {
  return (
    <section id="family-tree" className={classes.section}>
      <div className={classes.main_container}>
        <h1>עץ משפחתי</h1>
        <div className={classes.family_tree_container}>
          <img src="../../assets/family-tree.png" alt="family-tree" />
        </div>
      </div>
    </section>
  );
};

export default FamilyTree;
