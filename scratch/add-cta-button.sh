#!/bin/bash

# This script adds the CONSULT US CTA button after the banner description <p> tag
# in all service and industry detail pages.

# The button HTML to inject (24px top margin = mt-6)
BUTTON='            <Link\n              href="\/contact"\n              className="mt-[24px] inline-flex h-[52px] items-center justify-center rounded-[10px] border border-[#F99D1C] bg-[#F99D1C] px-[32px] text-[16px] font-semibold uppercase text-white transition-all duration-300 ease-in-out hover:bg-white hover:text-black hover:border-[#F99D1C] cursor-pointer"\n            >\n              CONSULT US\n            <\/Link>'

echo "Script ready. Will use node for precise insertions."
