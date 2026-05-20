========================================================================
Contributing
========================================================================

This document outlines the process for making and submitting changes.


Making Changes
========================================================================

This section covers everything needed to understand and modify the
codebase locally.


Overview
------------------------------------------------------------------------

This is a static web application. All application logic runs entirely in
the browser and no server‐side services are required.

Collection data is stored locally using the browser’s ``localStorage``
API. The application is designed to operate fully offline once loaded.

The project intentionally avoids external dependencies where practical.
Changes should preserve the application’s simplicity, privacy, and
offline‐first design.


Repository Structure
------------------------------------------------------------------------

::

   assets/       Source assets processed by Hugo.
   config/     Configuration files for Hugo.
   content/    Site content and pages.
   layouts/    Templates and page layouts.
   static/     Static files copied directly into the generated site.


Development Environment
------------------------------------------------------------------------

Required software:

• `Hugo <https://gohugo.io/>`_ (0.163.0 or newer)

No additional services, databases, or external dependencies
are required.


Running the Project
------------------------------------------------------------------------

Start a local development server::

  hugo server


Running the Test Suite
------------------------------------------------------------------------

At present, the project does not include an automated test suite.


Submitting Your Changes
========================================================================

This section covers the standards and process for sharing changes with
the project steward.


Style‐check Your Changes
------------------------------------------------------------------------

Check your changes for basic style violations.

Note, though, that style checkers should be viewed as a guide, not as a
replacement for human judgment—if your code looks better with a
violation, it is probably best left alone. You should, however, be able
to justify all violations that remain in your contribution.


Test Your Changes
------------------------------------------------------------------------

If your changes introduce new functionality, include tests that cover
it. For bug fixes, include a regression test where practical.

Ensure the full test suite passes before submitting.


Describe Your Changes
------------------------------------------------------------------------

Every contribution should include a commit message that clearly explains
what changed and why.

The canonical commit message format is::

  [<TYPE>] <Summary>

  <Body (Optional)>

``TYPE`` must be one of:

• ``MAJOR``—backwards incompatible changes
• ``MINOR``—backwards compatible features or enhancements
• ``PATCH``—backwards compatible bug fixes

The ``Summary`` should be a short imperative phrase concisely describing
the change. Try to keep it under 72 characters.

If additional context is needed, include a message body that answers the
following questions:

• What problem motivated this change?
• What does this change do?
• Why was this approach chosen?

A contribution should be understandable from its commit message and the
accompanying changeset alone.


Sign Your Work
------------------------------------------------------------------------

We use a Sign‐off procedure for all contributions. The Sign‐off is a
simple line at the end of the commit message, which certifies compliance
with the applicable Contributor License(s), including:

• `Haras Software Contributor License 1.0.0 <License_Contributor.rst>`_

To Sign‐off a contribution, add the following line at the end of your
commit message::

  Signed-off-by: [NAME <EMAIL>]

The Sign‐off can be added automatically when creating commits or reverts
using the ``-s`` option::

  git commit -s
  git revert -s

The first Sign‐off entry identifies the primary author of the
contribution. Subsequent Sign‐off entries are from people handling and
transporting the contribution, but were not involved in its development.
Sign‐off chains should reflect the real route a contribution took as it
was propagated to the steward of the project.


Send Your Work
------------------------------------------------------------------------

Contributions are accepted via email at ibrahim@iHaras.org.

You can:

• use ``git send-email`` to submit your patches.
• use ``git format-patch`` to prepare your patch files and attach them
  as MIME attachments.
• share a link to an online Git repository with the modified version of
  the project.

Expect review feedback by reply.
