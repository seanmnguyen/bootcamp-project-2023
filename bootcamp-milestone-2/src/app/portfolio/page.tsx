import style from "./portfolio.module.css";
import ProjectInfo from "../../components/projectInfo";
import connectDB from "../../helpers/db";
import ProjectComp from "../../database/projectSchema";

async function getProjects() {
  await connectDB();

  try {
    const projects = await ProjectComp.find().sort({ date: -1 }).orFail();
    return projects;
  } catch (err) {
    return null;
  }
}

export default async function Portfolio() {
  const projectItems = await getProjects();

  if (projectItems) {
    return (
      <div>
        <main>
          <h1 className={style.pageTitle}>Portfolio</h1>
          <div className={style.projectList}>
            <ul>
              {projectItems.map((project, index) => (
                <li key={index}>
                  <ProjectInfo
                    title={project.title}
                    slug={project.slug}
                    date={project.date}
                    description={project.description}
                    image={project.image}
                    alt={project.alt}
                    order={project.order}
                    key={index}
                  />
                </li>
              ))}
            </ul>
          </div>
        </main>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col gap-16">
        <h1 className="text-2xl font-bold">No projects found</h1>
      </div>
    );
  }
}
