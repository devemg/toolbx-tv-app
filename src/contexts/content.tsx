import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  type ReactNode,
} from "react";
import type {
  IContent,
  IContentList,
  IContentListResponse,
  IContentTab,
} from "@/models/content";

interface ContentContextState {
  selectedContent: IContent | null;
  selectedTab?: string;
  contentList: IContentList[];
  isLoading: boolean;
}

interface ContentContextValue extends ContentContextState {
  setSelectedContent: (content: IContent | null) => void;
  setContentList: (contents: IContentListResponse) => void;
  setLoading: (loading: boolean) => void;
  setSelectedTab: (tab: IContentTab | string | undefined) => void;
}

const ContentContext = createContext<ContentContextValue | undefined>(
  undefined
);

interface ContentProviderProps {
  children: ReactNode;
}

export const ContentProvider: React.FC<ContentProviderProps> = ({
  children,
}) => {
  const [selectedContent, setSelectedContent] = useState<IContent | null>(null);
  const [selectedTab, setSelectedTabState] = useState<string | undefined>(
    "home"
  );
  const [contentList, setContentListState] = useState<IContentList[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);

  const setContentList = useCallback((content: IContentListResponse) => {
    setContentListState(content.results);
    setSelectedContent(null);
  }, []);

  const setSelectedTab = useCallback((tab: IContentTab | string | undefined) => {
    setSelectedTabState(typeof tab === "string" ? tab : tab?.id);
  }, []);

  const value = useMemo(
    () => ({
      selectedContent,
      selectedTab,
      contentList,
      isLoading,
      setSelectedContent,
      setContentList,
      setLoading,
      setSelectedTab,
    }),
    [selectedContent, selectedTab, contentList, isLoading, setContentList]
  );

  return (
    <ContentContext.Provider value={value}>{children}</ContentContext.Provider>
  );
};

export const useContent = (): ContentContextValue => {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error("useContent must be used within a ContentProvider");
  }
  return context;
};
