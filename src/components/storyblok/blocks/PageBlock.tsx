import { StoryblokServerComponent, storyblokEditable } from "@storyblok/react/rsc";

type Blok = {
  _uid: string;
  component: string;
  body?: Array<{ _uid?: string } & Record<string, unknown>>;
};

export default function PageBlock({ blok }: { blok: Blok }) {
  return (
    <div {...storyblokEditable(blok)}>
      {(blok.body || []).map((nestedBlok, index) => (
        <StoryblokServerComponent blok={nestedBlok as never} key={String(nestedBlok._uid || index)} />
      ))}
    </div>
  );
}
