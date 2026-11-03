export type ProjectDetails = {
  title: string;
  intro: string[];
  links: { label: string; url: string; primary?: boolean }[];
  sections: { id: string; title: string; paragraphs?: string[]; bullets?: string[] }[];
  diagrams: {
    id: string;
    title: string;
    description: string;
    lanes: { name: string; steps: { title: string; description: string }[] }[];
    caption?: string;
  }[];
  example?: {
    title: string;
    intro: string;
    panels: { label: string; language: string; code: string }[];
    note?: string;
  };
  screenshots?: { src: string; alt: string; caption: string; width: number; height: number }[];
  limits?: string[];
};

export const projectDetails: Record<string, ProjectDetails> = {
  structformer: {
    title: "StructFormer",
    intro: [
      "StructFormer explores a specific data-engineering question: can a sequence model learn to turn a structured validation error into a corrective statement? Its inputs combine identifiers and error descriptions; its targets are structured actions such as SQL updates and adjustment-log inserts.",
      "The project uses a custom Transformer encoder–decoder with TensorFlow/Keras and a SentencePiece tokenizer. The repository contains preprocessing, training and inference code, making the transformation pipeline available to inspect rather than hiding it behind a hosted demo.",
    ],
    links: [
      { label: "Explore the source", url: "https://github.com/spsarolkar/StructFormer", primary: true },
      { label: "Read the project article", url: "https://spsarolkar.github.io/blog/2025/Structformer-Structural-Data-Transformer/" },
    ],
    sections: [
      {
        id: "structformer-problem",
        title: "From an error record to an action",
        paragraphs: [
          "Financial and trading workflows can produce errors such as a missing quantity or an incorrect account type. The experiment frames correction as paired input and output text: an error record on one side, the intended adjustment on the other. The training data supplies the target; the model learns the sequence transformation.",
        ],
      },
      {
        id: "structformer-implementation",
        title: "Inside the implementation",
        bullets: [
          "SentencePiece converts domain text and identifiers into subword token IDs.",
          "Preprocessing prepares encoder inputs, decoder inputs and target labels, with padding and sequence boundaries.",
          "The encoder–decoder combines attention layers with feed-forward layers to predict the next output token.",
          "Inference starts with a beginning-of-sequence token, selects the highest-scoring next token and continues until the end token or length limit, then decodes the result to text.",
        ],
      },
      {
        id: "structformer-roadmap",
        title: "Ideas beyond the experiment",
        paragraphs: [
          "The original roadmap proposed a FastAPI interface, hosted inference, an optional LLM fallback and a dashboard for inspecting per-record changes. These are extension ideas, separate from the model and inference code described here.",
        ],
      },
    ],
    diagrams: [
      {
        id: "structformer-flow",
        title: "How the transformation is represented",
        description: "A conceptual reading of the repository's preprocessing and inference stages.",
        lanes: [
          {
            name: "Preparing examples",
            steps: [
              { title: "Paired records", description: "Structured input and its supplied target action." },
              { title: "SentencePiece", description: "Convert both sequences into token IDs." },
              { title: "Training inputs", description: "Prepare padded encoder inputs, decoder inputs and labels." },
            ],
          },
          {
            name: "Generating a candidate",
            steps: [
              { title: "Input tokens", description: "Represent the structured error as a sequence." },
              { title: "Encoder–decoder", description: "Predict output tokens with the trained Transformer." },
              { title: "Greedy decoding", description: "Choose one token at a time and decode to SQL text." },
            ],
          },
        ],
        caption: "The output is a generated candidate statement, not a demonstrated database execution or correctness guarantee.",
      },
    ],
    example: {
      title: "A paired example",
      intro: "This input and supplied target come from the repository README. They illustrate the training format, not a measured prediction.",
      panels: [
        { label: "Structured input", language: "text", code: "TradeID=93297 AccountID=ACC1003 ErrorType=Missing Quantity" },
        { label: "Supplied target", language: "sql", code: "UPDATE Trades SET Quantity=46 WHERE TradeID=93297;\nINSERT INTO AdjustmentLog(ErrorID, AdjustedBy)\nVALUES('ERR3008', 'User1');" },
      ],
    },
    limits: [
      "The historical articles and README report different accuracy figures. This page does not treat those figures as verified held-out accuracy or SQL correctness.",
    ],
  },
  "gcp-ml-mock-exam": {
    title: "GCP ML Engineer Mock Exam",
    intro: [
      "I built this practice application while preparing for the Google Cloud Professional Machine Learning Engineer exam. The aim was to make a question bank easier to use: choose a topic, work through a timed session and review the answers afterwards.",
      "It is a static web application built with Jekyll, JavaScript, YAML and TailwindCSS, hosted on GitHub Pages. Questions live in editable data files, so the approach can be adapted to other subjects without building a separate backend.",
    ],
    links: [
      { label: "Open the practice app", url: "https://spsarolkar.github.io/ml-cert-mock-exam/", primary: true },
      { label: "Explore the source", url: "https://github.com/spsarolkar/ml-cert-mock-exam" },
      { label: "Read the build article", url: "https://spsarolkar.github.io/blog/2025/Building-GCP-ML-Engineer-MockExam-app-with-Github-pages/" },
    ],
    sections: [
      {
        id: "mock-exam-practice",
        title: "A practice session, from start to review",
        bullets: [
          "Filter questions by topic tags and sample across sections.",
          "Choose a timed mode; the historical interface includes Full, Quick and Sample sessions.",
          "Use the countdown to pace the session, with automatic submission when time runs out.",
          "Review correct and incorrect choices in an answer summary, or focus on the questions you missed.",
          "Save a print-friendly summary as a PDF for later review.",
        ],
      },
      {
        id: "mock-exam-question-bank",
        title: "Questions are data",
        paragraphs: [
          "The original build stores section question banks under _data/sections/. Each YAML entry contains a question, an options list, the expected answer and topic tags. This keeps content editing separate from the browser interactions and presentation.",
          "Jekyll generates the static pages; JavaScript handles the session in the browser. The documented design combines section-weighted sampling with tag filtering, rather than making every practice session a fixed sequence of the same questions.",
        ],
      },
    ],
    diagrams: [
      {
        id: "mock-exam-flow",
        title: "From question bank to useful feedback",
        description: "The original application separates publishing the question bank from taking a practice session.",
        lanes: [
          {
            name: "Publishing",
            steps: [
              { title: "YAML sections", description: "Questions, options, expected answers and tags." },
              { title: "Jekyll build", description: "Generate the static application pages." },
              { title: "GitHub Pages", description: "Host the application for browser access." },
            ],
          },
          {
            name: "Practising",
            steps: [
              { title: "Choose a session", description: "Select a topic filter and exam mode." },
              { title: "Answer questions", description: "Work through the selection with a countdown." },
              { title: "Review and save", description: "Inspect answers and export a printable summary." },
            ],
          },
        ],
      },
    ],
    screenshots: [
      {
        src: "/assets/projects/GCPML_ENG_MOCK_EXAM/WelcomePage.png",
        alt: "Historical mock exam welcome page with a Start Mock Test button",
        caption: "Welcome screen from the July 2025 build article.",
        width: 829,
        height: 465,
      },
      {
        src: "/assets/projects/GCPML_ENG_MOCK_EXAM/SelectingExamMode.png",
        alt: "Historical mode selector showing Full 120 minutes, Quick 30 minutes and Sample 10 minutes above a practice question",
        caption: "The historical topic and mode controls. Screenshots document that version of the app.",
        width: 824,
        height: 572,
      },
    ],
    limits: [
      "An independent learning project, not affiliated with or endorsed by Google. The original article describes its question-writing approach; this page does not claim alignment with the current certification syllabus or predict an exam result.",
    ],
  },
  "rouge-syntax-highlighter": {
    title: "Rouge Syntax Highlighter Preview",
    intro: [
      "While choosing syntax highlighting for my blog, I wanted to compare Rouge themes on actual sample code. This small preview application makes that choice visible: pick a theme and see how it changes the highlighted examples.",
      "The original implementation combines Ruby's Rouge highlighter, a shell generation script, Jekyll templates and a small amount of JavaScript. Theme assets are generated ahead of time; selecting a theme changes the stylesheet used by the page.",
    ],
    links: [
      { label: "Open the theme preview", url: "https://spsarolkar.github.io/rouge-theme-preview/", primary: true },
      { label: "Explore the source", url: "https://github.com/spsarolkar/rouge-theme-preview" },
      { label: "Read the implementation article", url: "https://spsarolkar.github.io/blog/2018/Rouge-themes-preview/" },
    ],
    sections: [
      {
        id: "rouge-generation",
        title: "Generate once, compare in the browser",
        paragraphs: [
          "The script generateThemeYaml.sh performs two jobs: collect the available Rouge theme names into _data/themes.yaml, and generate a stylesheet for each theme under css/. Each CSS filename follows the pattern syntax-<theme-name>.css.",
          "A Liquid loop uses the YAML list to build the theme selector. In the original browser code, choosing a theme removes the active syntax stylesheet and appends a link to the newly selected one. The sample code remains in place, making differences in colour and contrast easier to compare.",
        ],
      },
      {
        id: "rouge-small-tool",
        title: "A small tool for a specific decision",
        bullets: [
          "Compare themes against the same highlighted code examples.",
          "Generate the selector and styles from the themes available to the build.",
          "Keep the interaction static-site friendly: no application server is needed for switching stylesheets.",
        ],
      },
    ],
    diagrams: [
      {
        id: "rouge-flow",
        title: "How a theme reaches the preview",
        description: "Two short flows explain the original implementation without mixing build work with browser interaction.",
        lanes: [
          {
            name: "Building the page",
            steps: [
              { title: "Rouge themes", description: "The theme names available to the build." },
              { title: "Shell generation", description: "Write a YAML list and one CSS file per theme." },
              { title: "Jekyll and Liquid", description: "Build the selector from that list." },
            ],
          },
          {
            name: "Choosing a theme",
            steps: [
              { title: "Select a name", description: "Choose a theme from the dropdown." },
              { title: "Replace stylesheet", description: "Remove the old syntax CSS and link the selected file." },
              { title: "Compare the code", description: "Inspect the same examples in the new theme." },
            ],
          },
        ],
      },
    ],
    screenshots: [
      {
        src: "/assets/projects/SyntaxHeighlighting/rouge-theme-selector.png",
        alt: "Historical Rouge theme preview with its dropdown open above highlighted code samples",
        caption: "The theme selector shown in the original August 2018 article.",
        width: 787,
        height: 816,
      },
    ],
    limits: [
      "The original article located the application code on the gh-pages branch and listed custom background selection as a future idea. Those are historical notes, not a claim about the current theme inventory or feature set.",
    ],
  },
  "findbugs-plugin": {
    title: "Findbugs Resource-Tracking Plugin",
    intro: [
      "This project grew from a concrete JDBC resource-leak case encountered while using Findbugs in Eclipse. A method received a connection from a helper, used it and did not close it. The original report describes a case the existing analysis missed.",
      "I built an add-on, AdvancedResourceTrackr, to address that reported scenario. The useful starting point is the ownership boundary: the connection is opened inside one method, but the caller receives and uses the resource.",
    ],
    links: [
      { label: "Explore the plugin source", url: "https://github.com/spsarolkar/Findbugs_AdResTrackr", primary: true },
      { label: "Read the original report", url: "https://spsarolkar.github.io/blog/2014/Findbugs-issue-with-detecting-resource-leaks/" },
      { label: "View the historical JAR", url: "https://github.com/spsarolkar/Findbugs_AdResTrackr/blob/master/AdvancedResourceTrackr/dist/LeakedResourceDetector.jar" },
    ],
    sections: [
      {
        id: "findbugs-scenario",
        title: "The connection crosses a method boundary",
        paragraphs: [
          "In the original example, Test() calls getConn(), then creates a statement and executes a query. The helper returns DriverManager.getConnection(...). The cleanup block contains a commented-out conn.close(), so the connection is not released by that code.",
          "That makes the helper call the important detail. Looking only for a direct connection-creation call in the consuming method would not describe this example. The add-on was written to recognise the leak situation reported there.",
        ],
      },
      {
        id: "findbugs-artifacts",
        title: "What is available to explore",
        bullets: [
          "The original report includes the fuller JDBC example and explains the missed connection leak.",
          "The repository preserves the plugin project for inspection and further experimentation.",
          "The historical distribution is named LeakedResourceDetector.jar under AdvancedResourceTrackr/dist/.",
        ],
      },
    ],
    diagrams: [
      {
        id: "findbugs-resource-flow",
        title: "Following the resource through the example",
        description: "The reported program flow, not a diagram of the plugin's internal analysis.",
        lanes: [
          {
            name: "Historical leak scenario",
            steps: [
              { title: "Caller requests a connection", description: "Test() invokes getConn()." },
              { title: "Helper opens the resource", description: "DriverManager creates the JDBC connection." },
              { title: "Caller uses the returned connection", description: "Create a statement and execute a query." },
              { title: "Cleanup is omitted", description: "The example's conn.close() is commented out." },
            ],
          },
        ],
      },
    ],
    example: {
      title: "The essential part of the report",
      intro: "These shortened excerpts preserve the helper-returned connection and omitted cleanup. They intentionally illustrate the historical leak, not recommended application code.",
      panels: [
        { label: "The helper", language: "java", code: "private static Connection getConn() throws SQLException {\n  return DriverManager.getConnection(DB_URL, USER, PASS);\n}" },
        { label: "The caller", language: "java", code: "conn = getConn();\nstmt = conn.createStatement();\nResultSet rs = stmt.executeQuery(sql);\n\n// In the original finally block, conn.close() is commented out." },
      ],
    },
    limits: [
      "This page documents a 2014 Findbugs/Eclipse project. It does not establish compatibility with current Findbugs or SpotBugs versions, or claim detection coverage beyond the reported scenario.",
    ],
  },
};
